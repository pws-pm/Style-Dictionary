In figma export the JSON with Design Tokens plugin:
    https://www.figma.com/community/plugin/888356646278934516/design-tokens
    When exporting to file exlcude:
        Typography (as it is redundant in font styles)
        Grids (are used in figma just as helper for icons etc)

Navigate in the project folder and install style dictionary locally
    npm install style-dictionary

Launch style dictionary locally
    npx style-dictionary build