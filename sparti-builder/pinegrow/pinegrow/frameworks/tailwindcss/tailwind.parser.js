class PgTailwind4ConfigParser{constructor(){this._originalCode="",this.originalLines=[],this.themeStartIndex=-1,this.themeBlockOpenBraceIndex=-1,this.themeBlockCloseBraceIndex=-1,this.variables={},this.hasParsed=!1}parse(e){this._originalCode=e,this.originalLines=e.split(/\r?\n/),this.themeStartIndex=-1,this.themeBlockOpenBraceIndex=-1,this.themeBlockCloseBraceIndex=-1,this.variables={},this.hasParsed=!1,this._findThemeBlockIndices(e),-1!==this.themeBlockOpenBraceIndex&&-1!==this.themeBlockCloseBraceIndex&&this._parseThemeVariables(e),this.hasParsed=!0}getCodeBeforeTheme(){if(this.hasParsed)return-1===this.themeStartIndex||-1===this.themeBlockOpenBraceIndex||-1===this.themeBlockCloseBraceIndex?this._originalCode:this._originalCode.slice(0,this.themeStartIndex);throw new Error("Must call parse() before getCodeBeforeTheme().")}getCodeAfterTheme(){if(this.hasParsed)return-1===this.themeStartIndex||-1===this.themeBlockOpenBraceIndex||-1===this.themeBlockCloseBraceIndex?"":this._originalCode.slice(this.themeBlockCloseBraceIndex+1);throw new Error("Must call parse() before getCodeAfterTheme().")}getThemeVariables(){if(!this.hasParsed)throw new Error("Must call parse() before getThemeVariables().");var e,i,t={};for([e,i]of Object.entries(this.variables))t[e]=i.value;return t}setThemeVariable(e,i,t){if(!this.hasParsed)throw new Error("Must call parse() before setThemeVariable().");var s;-1!==this.themeBlockOpenBraceIndex&&-1!==this.themeBlockCloseBraceIndex||(this._appendEmptyThemeBlock(),s=this.originalLines.join("\n"),this.parse(s)),this.variables[e]?(s=this.variables[e].lineIndex,this.originalLines[s]=this._buildVariableLine(e,i),this.variables[e].value=i):t?(s=this._charIndexToLineIndex(this.themeBlockOpenBraceIndex),s=this._maybeSplitEmptyThemeLine(s),this.originalLines.splice(s+1,0,this._buildVariableLine(e,i)),s=this.originalLines.join("\n"),this.parse(s)):(s=this._charIndexToLineIndex(this.themeBlockCloseBraceIndex),s=this._maybeSplitEmptyThemeLine(s),this.originalLines.splice(s,0,this._buildVariableLine(e,i)),s=this.originalLines.join("\n"),this.parse(s))}addAfterTheme(e){if(!this.hasParsed)throw new Error("Must call parse() before addAfterTheme().");var i=this.originalLines.join("\n");if(!i.includes(e)){if(-1===this.themeBlockOpenBraceIndex||-1===this.themeBlockCloseBraceIndex){this._appendEmptyThemeBlock();const t=this.originalLines.join("\n");this.parse(t)}i=this._charIndexToLineIndex(this.themeBlockCloseBraceIndex);this.originalLines.splice(i+1,0,e);const t=this.originalLines.join("\n");this.parse(t)}}appendCode(e){if(!this.hasParsed)throw new Error("Must call parse() before appendCode().");var i;e&&(i=e.split(/\r?\n/),this.originalLines.push(...i),i=this.originalLines.join("\n"),this.parse(i))}prependCode(e){if(!this.hasParsed)throw new Error("Must call parse() before prependCode().");var i;e&&(i=e.split(/\r?\n/),this.originalLines.unshift(...i),i=this.originalLines.join("\n"),this.parse(i))}getString(){return this.originalLines.join("\n")}static test(){let t=0,s=0;[{name:"No theme block, then set variable => should create @theme block",input:`
@layer theme, base, components, utilities;
@import "./theme.css" layer(theme);
@import "./preflight.css" layer(base);
@import "./utilities.css" layer(utilities);

/* no @theme here */
@custom-variant dark (&:where([data-theme=dark]));
        `,actions:e=>{e.setThemeVariable("--color-blue-100","oklch(0.90 0.03 240)")},check:e=>{var i=e.getString();if(!i.includes("@theme {")||!i.includes("--color-blue-100: oklch(0.90 0.03 240);"))throw new Error("Failed to create @theme block or set variable.");console.log("PASS: Created @theme block with new variable.")}},{name:"Basic theme block => read & update variable",input:`
@theme {
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --color-red-50: oklch(0.971 0.013 17.38);
  /* --color-red-200: in comment } */
}
        `,actions:e=>{if(!e.getThemeVariables()["--color-red-50"])throw new Error("Missing known var '--color-red-50'.");e.setThemeVariable("--color-red-50","oklch(0.900 0.050 17)")},check:e=>{if("oklch(0.900 0.050 17)"!==e.getThemeVariables()["--color-red-50"])throw new Error("Variable was not updated properly.");console.log("PASS: Existing variable was updated successfully.")}},{name:"Add a new variable inside existing @theme",input:`
@theme {
  --old-var: initial;
}
        `,actions:e=>{e.setThemeVariable("--brand-new-var","some-value")},check:e=>{if(!e.getString().includes("--brand-new-var: some-value;"))throw new Error("New variable was not appended to theme block.");console.log("PASS: Successfully appended new variable in existing theme block.")}},{name:"Add CSS after theme block",input:`
@theme {
  --font-serif: "Times New Roman", serif;
}
        `,actions:e=>{e.addAfterTheme(`
@custom-variant highlight (&:hover);
`)},check:e=>{var i=e.getString();if(!i.includes("@theme {")||!i.includes("@custom-variant highlight (&:hover);"))throw new Error("Failed to insert CSS after theme block.");console.log("PASS: Inserted CSS after theme block.")}},{name:"Attempt parse of invalid block (missing closing brace)",input:`
@theme {
  --font-mono: ui-monospace;
  /* missing '}' somewhere 
        `,actions:e=>{},shouldThrow:!0,check:()=>{console.log("FAIL: Should have thrown error but did not.")}},{name:"Attempt parse with unclosed block comment",input:`
/* This comment never ends...
@theme {
  --some-var: 123;
}
        `,actions:e=>{},shouldThrow:!0,check:()=>{console.log("FAIL: Should have thrown error for unclosed block comment but did not.")}},{name:"Code with line comments // and block comments /* ignoring braces */",input:`
// Some line comment {}}} 
@theme { // inline comment {
  --line-one: v1; // just a line
  /* This is a block comment with { and } 
     that should not break anything 
  */
  --line-two: v2;
}
// done
        `,actions:e=>{var i=e.getThemeVariables();if(!i["--line-one"]||!i["--line-two"])throw new Error("Parser missed variables due to tricky comments.");e.setThemeVariable("--line-one","updated")},check:e=>{if("updated"!==e.getThemeVariables()["--line-one"])throw new Error("Failed to update variable after tricky comments parse.");console.log("PASS: Successfully parsed code with tricky comments and updated variable.")}}].forEach(i=>{console.log(`
[Test] `+i.name);try{var e=new PgTailwind4ConfigParser;e.parse(i.input),i.shouldThrow?(console.log("FAIL: Expected parse() to throw but it did not."),s++):("function"==typeof i.actions&&i.actions(e),"function"==typeof i.check&&i.check(e),t++)}catch(e){i.shouldThrow?(console.log(`PASS: Caught expected error: `+e.message),t++):(console.log(`FAIL: `+e.message),s++)}}),console.log(`
========== Test Summary ==========`),console.log(`Passed: `+t),console.log(`Failed: `+s),console.log(`==================================`)}_findThemeBlockIndices(e){let i=0;var t=e.length;let s=!1,r=!1;var n=[];let o=-1,a=-1,l=-1;for(;i<t;){var h=e[i],c=i<t-1?e[i+1]:"";if(s)"*"===h&&"/"===c?(s=!1,i+=2):i++;else if(r||"/"!==h||"*"!==c)if(r)"\n"===h&&(r=!1),i++;else{if("{"===h)-1!==o&&-1===a?(a=i,n.push("{")):-1!==a&&n.push("{");else if("}"===h){if(0<n.length&&(n.pop(),0===n.length)&&-1!==a&&-1===l){l=i;break}}else"@"===h&&"@theme"===e.slice(i,i+6).toLowerCase()&&-1===o&&(o=i);"/"===h&&"/"===c?(r=!0,i+=2):i++}else s=!0,i+=2}if(s)throw new Error("Invalid syntax: unclosed block comment '/* ... */'.");if(-1!==a&&-1===l)throw new Error("Invalid syntax: '@theme' block is not closed with '}'.");this.themeStartIndex=o,this.themeBlockOpenBraceIndex=a,this.themeBlockCloseBraceIndex=l}_parseThemeVariables(o){if(-1!==this.themeBlockOpenBraceIndex&&-1!==this.themeBlockCloseBraceIndex){this.variables={};var a=this.themeBlockOpenBraceIndex+1,l=this.themeBlockCloseBraceIndex;let r=!1;for(let n=0;n<this.originalLines.length;n++){let s=!1;var h=this._lineIndexToCharIndex(n),c=h+this.originalLines[n].length;if(!(c<a||l<h)){h=Math.max(a,h),c=Math.min(l,c);let e="",i=(h<c&&(e=o.slice(h,c)),""),t=0;for(;t<e.length;){var d=e[t],m=t<e.length-1?e[t+1]:"";r?"*"!==d||"/"!==m?t++:(r=!1,t+=2):s?t++:"/"===d&&"*"===m?(r=!0,t+=2):"/"===d&&"/"===m?(s=!0,t+=2):(i+=d,t++)}for(var p=/(--[A-Za-z0-9_\-\*]+)\s*:\s*([^;]+);/g;null!==(u=p.exec(i));){var g=u[1],u=u[2].trim();this.variables[g]={value:u,lineIndex:n}}}}}}_appendEmptyThemeBlock(){this.originalLines.push(""),this.originalLines.push("@theme {"),this.originalLines.push("}")}_lineIndexToCharIndex(e){let i=0;for(let t=0;t<e;t++)i+=this.originalLines[t].length+1;return i}_charIndexToLineIndex(e){let i=0;for(let s=0;s<this.originalLines.length;s++){var t=this.originalLines[s].length;if(e>=i&&e<i+t)return s;i+=t+1}return this.originalLines.length-1}_buildVariableLine(e,i){return`  ${e}: ${i};`}_maybeSplitEmptyThemeLine(e){var i=this.originalLines[e].trim().match(/^@theme\s*\{\s*\}(.*)$/i);return i?(i=i[1],this.originalLines[e]="@theme {",this.originalLines.splice(e+1,0,(`}`+i).trim()),e+1):e}}pgIsDev()&&PgTailwind4ConfigParser.test();