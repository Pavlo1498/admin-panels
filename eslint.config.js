import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import pluginQuasar from '@quasar/app-vite/eslint';

export default [
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended() already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    ignores: [
        'dist/*',
        'src-capacitor/*',
        'src-cordova/*',
        '.quasar/*',
        'quasar.config.*.temporary.compiled*',
        '/node_modules'
    ]
  },

  ...pluginQuasar.configs.recommended(),
  js.configs.recommended,

  /**
   * https://eslint.vuejs.org
   *
   * pluginVue.configs.base
   *   -> Settings and rules to enable correct ESLint parsing.
   * pluginVue.configs[ 'flat/essential']
   *   -> base, plus rules to prevent errors or unintended behavior.
   * pluginVue.configs["flat/strongly-recommended"]
   *   -> Above, plus rules to considerably improve code readability and/or dev experience.
   * pluginVue.configs["flat/recommended"]
   *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
   */
  ...pluginVue.configs['flat/essential'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly' // BEX related
      }
    },

    // add your custom rules here
    rules: {
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        'max-len': ['error', {
            code: 140,
            'ignoreTrailingComments': true
        }],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'always'
        }],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'semi': ['error', 'always'],
        'vue/max-attributes-per-line': ['error', {
            'singleline': {
                'max': 2
            },
            'multiline': {
                'max': 1
            }
        }],
        'vue/multiline-html-element-content-newline': ['error', {
            'ignoreWhenEmpty': true,
            'allowEmptyLines': true
        }],
        'vue/first-attribute-linebreak': ['error', {
            'singleline': 'ignore',
            'multiline': 'below'
        }],
        'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
        'vue/attributes-order': ['error', {
            'order': [
                'DEFINITION',
                'LIST_RENDERING',
                'CONDITIONALS',
                'RENDER_MODIFIERS',
                'GLOBAL',
                ['UNIQUE', 'SLOT'],
                'TWO_WAY_BINDING',
                'OTHER_DIRECTIVES',
                'OTHER_ATTR',
                'EVENTS',
                'CONTENT'
            ],
            'alphabetical': false
        }],
        'comma-dangle': ['error', 'never'],
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'generator-star-spacing': [
            'error',
            {
                before: true,
                after: false
            }
        ],
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true
            }
        ],
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-duplicate-imports': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: true
            }
        ],
        'prefer-const': 'error',
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true
                }
            }
        ],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'rest-spread-spacing': ['error', 'never'],
        'template-curly-spacing': ['error', 'never'],
        'yield-star-spacing': [
            'error',
            {
                before: true,
                after: false
            }
        ],
        'prefer-promise-reject-errors': 'off',
        'vue/no-lifecycle-after-await': 'off',
        'vue/no-expose-after-await': 'off',
        'arrow-body-style': 'off',
        'no-trailing-spaces': 'off',

        // allow debugger during development only
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  },
  {
    files: ['src-pwa/custom-service-worker.js'],
    languageOptions: {
      globals: {
        ...globals.serviceworker
      }
    }
  }
];
