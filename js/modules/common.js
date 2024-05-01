function TruncateString(str, maxLength) {
   return str.length > maxLength ?  str.substring(0, maxLength - 1) + "." : str;
}

export default TruncateString;