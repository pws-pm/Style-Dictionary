const StyleDictionary = require('style-dictionary');

StyleDictionary.registerFormat({
  name: 'scss/customShadowVariables',
  formatter: ({ dictionary }) => {
    let output = `\n// Do not edit directly\n// Generated on ${new Date().toUTCString()}\n\n`;
    const groupedShadows = {};

    dictionary.allProperties.forEach(prop => {
      if (prop.type === 'custom-shadow') {
        const { shadowType, radius, color, offsetX, offsetY, spread } = prop.value;
        let cssShadow = `${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`;
        if (shadowType === 'innerShadow') {
          cssShadow += ' inset';
        }
        const groupName = prop.path.slice(0, -1).join('-');
        groupedShadows[groupName] = groupedShadows[groupName] || [];
        groupedShadows[groupName].push(cssShadow);
      }
    });

    Object.keys(groupedShadows).forEach(groupName => {
      output += `$${groupName}: ${groupedShadows[groupName].join(', ')};\n`;
    });

    return output;
  }
});

StyleDictionary.registerFormat({
  name: 'scss/customTypographyMixin',
  formatter: ({ dictionary }) => {
    let output = `\n// Do not edit directly\n// Generated on ${new Date().toUTCString()}\n\n`;
    dictionary.allProperties
      .filter(prop => prop.type === 'custom-fontStyle')
      .forEach(prop => {
        const { fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, textDecoration, textCase } = prop.value;
        // Convert fontSize and lineHeight to px if they are numbers
        const fontSizePx = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
        const lineHeightPx = typeof lineHeight === 'number' ? `${lineHeight}px` : lineHeight;
        output += `@mixin ${prop.name} {\n`;
        output += `  font-family: ${fontFamily};\n`;
        output += `  font-weight: ${fontWeight};\n`;
        output += `  font-size: ${fontSizePx};\n`;
        output += `  line-height: ${lineHeightPx};\n`;
        output += `  letter-spacing: ${letterSpacing}px;\n`;
        output += `  text-decoration: ${textDecoration};\n`;
        output += `  text-transform: ${textCase};\n`;
        output += `}\n`;
      });
    return output;
  }
});

StyleDictionary.registerFormat({
  name: 'scss/colorVariablesExcludingColorbase',
  formatter: function(dictionary, config) {
      let output = `\n// Do not edit directly\n// Generated on ${new Date().toUTCString()}\n\n`;
      dictionary.allProperties.forEach(token => {
          if (token.attributes.category === 'color' && !token.name.startsWith('colorbase')) {
              output += `$${token.name}: ${token.value};\n`;
          }
      });
      return output;
  }
});



// Main Configuration for Style Dictionary
module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
            destination: "_colors.scss",
            format: "scss/colorVariablesExcludingColorbase",
            options: {
              outputReferences: false, // resolve aliases
            }
        },
        /*{
            destination: "_colors.scss",
            format: "scss/variables",
            filter: {
              type: "color"
              },
            options: {
              outputReferences: false,
            }
        },*/
        {
            destination: "_typography.scss",
            format: "scss/customTypographyMixin", // custom format
            filter: {
            type: "custom-fontStyle"
            }
        },
        {
            destination: "_shadows.scss",
            format: "scss/customShadowVariables", // custom format
            filter: {
            type: "custom-shadow"
            }
        },
        {
            destination: "_dimensions.scss",
            format: "scss/variables",
            filter: {
            type: "dimension",
            }
        }
      ]
    }
  }
};
