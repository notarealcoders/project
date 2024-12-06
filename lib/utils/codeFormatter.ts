import jsBeautify from 'js-beautify';

const formatters = {
  javascript: jsBeautify.js,
  typescript: jsBeautify.js,
  html: jsBeautify.html,
  css: jsBeautify.css,
};

const defaultOptions = {
  indent_size: 2,
  indent_char: ' ',
  max_preserve_newlines: 2,
  preserve_newlines: true,
  keep_array_indentation: false,
  break_chained_methods: false,
  indent_scripts: 'normal',
  brace_style: 'collapse',
  space_before_conditional: true,
  unescape_strings: false,
  jslint_happy: false,
  end_with_newline: false,
  wrap_line_length: 0,
  indent_inner_html: false,
  comma_first: false,
  e4x: false,
  indent_empty_lines: false,
};

export async function formatCode(code: string, language: string): Promise<string> {
  try {
    const formatter = formatters[language as keyof typeof formatters];
    if (!formatter) {
      return code;
    }

    return formatter(code, defaultOptions);
  } catch (error) {
    console.error('Error formatting code:', error);
    return code;
  }
}