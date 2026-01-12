import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Allow Three.js/React-Three-Fiber custom properties
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "args",
            "position",
            "rotation",
            "scale",
            "intensity",
            "distance",
            "castShadow",
            "receiveShadow",
            "attach",
            "count",
            "array",
            "itemSize",
            "metalness",
            "roughness",
            "emissive",
            "emissiveIntensity",
            "transparent",
            "opacity",
            "vertexColors",
            "sizeAttenuation",
            "font",
            "anchorX",
            "anchorY",
            "makeDefault",
            "fov",
            "shadows",
            "dpr",
            "gl",
            "speed",
            "rotationIntensity",
            "floatIntensity",
            "enableZoom",
            "enablePan",
            "enableRotate",
            "onCreated",
          ],
        },
      ],
      // React is auto-imported with new JSX transform
      "react/react-in-jsx-scope": "off",
      // Disable prop-types for JS projects (use TypeScript for type safety)
      "react/prop-types": "off",
      // Allow unescaped quotes in JSX for better readability
      "react/no-unescaped-entities": "off",
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^React$",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];
