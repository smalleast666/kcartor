import React from 'react'

class footer extends React.Component {
    constructor() {
        super()
        this.state = {
            bottom: "-50px"
        }
    }

    componentDidMount () {
        document.body.onmousewheel = (event) => {
            event = event || window.event;
            if (event.wheelDelta < 0) {
                this.setState({
                    bottom: 0
                })
                setTimeout(() => 
                    this.setState({
                        bottom: "-50px"
                    })
                ,2000)
            }
        };
    }

    render() {
        return (
            <div style={{
                color: "#eee",
                width: "100%",
                height: "50px",
                background: "#5B6E84",
                fontSize: "14px",
                textAlign: "center",
                padding: "15px",
                position: "fixed",
                transition: ".6s",
                bottom: this.state.bottom
            }}>ICP备案：
                <a href="http://www.miibeian.gov.cn" style={Record_num}>渝ICP备16000151号-1</a>
            </div>
        )
    }
}

const Record_num = {
    color: "#eee",

}

export default footer
