import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent() //func reference that will return promise
                .then(cmp => {
                    // will get arg that will have .default property which will be the component we loaded dynamically and now to be stored in state
                    this.setState({component: cmp.default})
                });
        }

        render() {
            const C = this.state.component;

            // {pass all props and be null if component hasnt been resolved yet}
            return C ? <C {...this.props} /> : null;
        }
    }
}
 export default asyncComponent;
