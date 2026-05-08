// @category RCT-JS
// @description Export every function as decompiled C, one file per RVA.
//
// Headless usage:
//   JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home \
//   /opt/homebrew/Cellar/ghidra/12.0.4/libexec/support/analyzeHeadless \
//       /Users/joelrobinson/rct-js/decompiled/ghidra-project rct \
//       -process rct.exe -noanalysis \
//       -scriptPath /Users/joelrobinson/rct-js/tools \
//       -postScript ExportDecompiled.java
//
// Set environment variable RCT_EXPORT_ONE=<hex_rva> to export a single function
// (used during pipeline scaffolding); leave it unset to export all functions.

import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import ghidra.app.script.GhidraScript;
import ghidra.app.decompiler.DecompInterface;
import ghidra.app.decompiler.DecompileOptions;
import ghidra.app.decompiler.DecompileResults;
import ghidra.app.decompiler.DecompiledFunction;
import ghidra.program.model.listing.Function;
import ghidra.program.model.listing.FunctionManager;
import ghidra.util.task.ConsoleTaskMonitor;

public class ExportDecompiled extends GhidraScript {

    private static final String OUT_DIR = "/Users/joelrobinson/rct-js/decompiled/c";
    private static final String MANIFEST = "/Users/joelrobinson/rct-js/decompiled/manifest.json";

    @Override
    public void run() throws Exception {
        DecompInterface decomp = new DecompInterface();
        decomp.setOptions(new DecompileOptions());
        decomp.openProgram(currentProgram);

        FunctionManager fm = currentProgram.getFunctionManager();
        ConsoleTaskMonitor monitor = new ConsoleTaskMonitor();

        String target = System.getenv("RCT_EXPORT_ONE");
        List<Function> funcs = new ArrayList<>();
        if (target != null && !target.isEmpty()) {
            long targetAddr = Long.parseLong(target.replace("0x", ""), 16);
            for (Function f : fm.getFunctions(true)) {
                if (f.getEntryPoint().getOffset() == targetAddr) {
                    funcs.add(f);
                    break;
                }
            }
        } else {
            for (Function f : fm.getFunctions(true)) {
                funcs.add(f);
            }
        }

        new File(OUT_DIR).mkdirs();

        StringBuilder manifest = new StringBuilder();
        manifest.append("{\n  \"functions\": [\n");
        int ok = 0;
        int failed = 0;
        boolean first = true;
        for (Function func : funcs) {
            long addr = func.getEntryPoint().getOffset();
            String name = func.getName();
            DecompileResults res = decomp.decompileFunction(func, 60, monitor);
            if (!res.decompileCompleted()) {
                println(String.format("FAIL  0x%x %s: %s", addr, name, res.getErrorMessage()));
                failed++;
                continue;
            }
            DecompiledFunction df = res.getDecompiledFunction();
            String c = df.getC();
            String sig = df.getSignature();
            String outPath = String.format("%s/%x.c", OUT_DIR, addr);
            try (PrintWriter pw = new PrintWriter(new FileWriter(outPath))) {
                pw.write(c);
            }
            if (!first) manifest.append(",\n");
            first = false;
            manifest.append(String.format(
                "    {\"addr\": \"0x%x\", \"name\": %s, \"signature\": %s, \"file\": \"c/%x.c\", \"byte_size\": %d}",
                addr, jsonEscape(name), jsonEscape(sig), addr, func.getBody().getNumAddresses()));
            ok++;
            if (ok % 100 == 0) {
                println(String.format("decompiled %d/%d", ok, funcs.size()));
            }
        }
        manifest.append(String.format("\n  ],\n  \"ok\": %d,\n  \"failed\": %d\n}\n", ok, failed));
        try (PrintWriter pw = new PrintWriter(new FileWriter(MANIFEST))) {
            pw.write(manifest.toString());
        }
        println(String.format("done: ok=%d failed=%d total=%d", ok, failed, funcs.size()));
    }

    private static String jsonEscape(String s) {
        if (s == null) return "null";
        StringBuilder sb = new StringBuilder("\"");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '"':  sb.append("\\\""); break;
                case '\\': sb.append("\\\\"); break;
                case '\n': sb.append("\\n");  break;
                case '\r': sb.append("\\r");  break;
                case '\t': sb.append("\\t");  break;
                default:
                    if (c < 0x20) sb.append(String.format("\\u%04x", (int) c));
                    else sb.append(c);
            }
        }
        sb.append("\"");
        return sb.toString();
    }
}
