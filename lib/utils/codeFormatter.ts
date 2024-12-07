import jsBeautify, {
  JSBeautifyOptions,
  HTMLBeautifyOptions,
  CSSBeautifyOptions,
} from "js-beautify";

const defaultOptions = {
  indent_size: 2,
  indent_char: " ",
  max_preserve_newlines: 2,
  preserve_newlines: true,
  keep_array_indentation: false,
  break_chained_methods: false,
  indent_scripts: "normal",
  brace_style: "collapse",
  space_before_conditional: true,
  unescape_strings: false,
  jslint_happy: false,
  end_with_newline: false,
  wrap_line_length: 0,
  indent_inner_html: false,
  comma_first: false,
  e4x: false,
  indent_empty_lines: false,
} as const;

const formatters = {
  javascript: (code: string) =>
    jsBeautify.js(code, defaultOptions as JSBeautifyOptions),
  typescript: (code: string) =>
    jsBeautify.js(code, defaultOptions as JSBeautifyOptions),
  html: (code: string) =>
    jsBeautify.html(code, defaultOptions as HTMLBeautifyOptions),
  css: (code: string) =>
    jsBeautify.css(code, defaultOptions as CSSBeautifyOptions),
};

export async function formatCode(
  code: string,
  language: string
): Promise<string> {
  try {
    const formatter = formatters[language as keyof typeof formatters];
    if (!formatter) {
      console.warn(`No formatter found for language: ${language}`);
      return code;
    }

    return formatter(code);
  } catch (error) {
    console.error("Error formatting code:", error);
    return code;
  }
}
