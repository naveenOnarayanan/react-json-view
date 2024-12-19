import React from 'react'
import { polyfill } from 'react-lifecycles-compat'
import { Provider } from 'react-redux'
import { store } from './store'
import JsonViewer from './components/JsonViewer'
import { toType, isTheme } from './helpers/util'

// forward src through to JsonObject component
class ReactJsonView extends React.PureComponent {
  static defaultProps = {
    theme: 'rjv-default',
    src: null,
    collapsed: false,
    collapseStringsAfter: 15,
    onAdd: true,
    onEdit: true,
    onDelete: true,
    displayObjectSize: true,
    enableClipboard: true,
    indentWidth: 4,
    displayDataTypes: true,
    iconStyle: 'triangle'
  }

  // make sure props are passed in as expected
  static validateState = state => {
    const validatedState = {}
    // make sure theme is valid
    if (toType(state.theme) === 'object' && !isTheme(state.theme)) {
      console.error(
        'react-json-view error:',
        'theme prop must be a theme name or valid base-16 theme object.',
        'defaulting to "rjv-default" theme'
      )
      validatedState.theme = 'rjv-default'
    }
    // make sure `src` prop is valid
    if (toType(state.src) !== 'object' && toType(state.src) !== 'array') {
      console.error(
        'react-json-view error:',
        'src property must be a valid json object'
      )
      validatedState.name = 'ERROR'
      validatedState.src = {
        message: 'src property must be a valid json object'
      }
    }
    return {
      // get the original state
      ...state,
      // override the original state
      ...validatedState
    }
  }

  render () {
    const { src, ...rest } = this.props
    return (
      <Provider store={store}>
        <JsonViewer src={src} {...rest} />
      </Provider>
    )
  }
}

polyfill(ReactJsonView)

export default ReactJsonView
