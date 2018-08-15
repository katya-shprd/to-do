import React, {Component} from 'react';

export default class Checkbox extends Component {

    render() {

        return (
            <div style={{position: 'relative'}}>
            <div onClick={this.props.onChange} style={styles.outer}>
                <div style={{
                    width: '22px',
                    height: '22px',
                    background: this.props.checked ? '#eee' : 'white',
                    borderRadius: '50%'    
                }} />
            </div>
            </div>
        )
    }
}

const styles = {
    outer: {
        padding: '8px',
        border: '1px solid #eee',
        borderRadius: '50%',
        marginRight: '25px',
        position: 'absolute',
        left: '-45px',
        top: '-18px'
    }
}