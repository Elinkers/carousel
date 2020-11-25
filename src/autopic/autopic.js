import React from 'react';
import './autopic.css';
import pic1 from "./1.jpg";
import pic2 from "./2.jpg";
import pic3 from "./3.jpg";
import pic4 from "./4.jpg";

const width=-1000;
const height=800;
const pageNumber = 4;

class Auto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            No: 0,
            left: 0,
            flag: false,
            x_start:"",
            x_last: ""
        }
    }

//1.0自动跳转
    componentDidMount(){
        this.timer=setInterval(
            ()=>this.tick_right(),
            2000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

//2.0小按钮
    tick_right(){
        let No = this.state.No;
        No++;
        if(No > pageNumber-1) {
            No = 0;
        }
        this.setState({
            No
        });

        this.setState({
            left: width*No
        });
    }

    tick_left(){
        let No = this.state.No;
        No--;
        if(No < 0) {
            No = pageNumber-1;
        }
        this.setState({
            No
        });

        this.setState({
            left: width*No
        })
    }    

    over(){
        clearInterval(this.timer);
    }

    out(){
        this.timer=setInterval(
            ()=>this.tick_right(),
            2000
        );
        document.getElementsByClassName('mid')[0].style.transition="1s";
        this.setState({
            left:this.state.No* width,
            flag:false
        });            
    }
    
//3.0拖拽功能
    down(e){
        this.setState({
            flag:true,
            x_last: e.clientX,
            x_start:e.clientX
        })
        document.getElementsByClassName('mid')[0].style.transition="0s";
    }

    move(e){
        let move=0;
        if(this.state.flag===true){
            move=this.state.x_last-e.clientX;
            this.setState({
                x_last:e.clientX,
                left:this.state.left-move
            })
        }
    }

    up(e){
        this.setState({
            flag:false
        })
        document.getElementsByClassName('mid')[0].style.transition="1s";
        if(this.state.x_start-e.clientX>0 && Math.abs(this.state.x_start-e.clientX)>=Math.abs(width/2)){
            this.tick_right();
        }
        else if(this.state.x_start-e.clientX<0 && Math.abs(this.state.x_start-e.clientX)>=Math.abs(width/2)){
            this.tick_left();
        }
        else{
            this.setState({
                left:this.state.No* width
            }) 
        }
    }

    spot(No){
        this.setState({
            No: No,
            left: No* width
        })
    }

//4.0实时小按钮功能
    renderDot() {
        let dots = [];
        for (let i = 0; i < pageNumber; i++) {
            dots.push(<div className="spot" onClick={() => {this.spot(i)}} >
                {
                    i === this.state.No ? "●" : "○"
                }
            </div>);
        }
        return dots;
    }

    
    creatPic(){
        let pics=[];
        let pic=[pic1,pic2,pic3,pic4];
        for(let i=0;i<pageNumber;i++){
            pics.push(<div className="pic" style={{width: Math.abs(width),height: height}}>
                <img src={pic[i]} alt={"none"} className="img" draggable="false">
                </img>
            </div>);
        }
        return pics;
    }

    render(){

        const board={width: Math.abs(width), height: height};

        return(
            <div className="big" onMouseOut={this.out.bind(this)} onMouseOver={this.over.bind(this)} onMouseDown={this.down.bind(this)} onMouseMove={this.move.bind(this)} onMouseUp={this.up.bind(this)} style={board}>
                <div className="mid" style={{left:this.state.left, width:Math.abs(width*4), height: height}}>
                    {
                        this.creatPic()
                    }
                </div>
                <div className="spot_block" >
                    {
                        this.renderDot()
                    }
                </div>
                <div className="shift_block" style={{width:Math.abs(width)}}>
                    <div className="left" onClick={this.tick_left.bind(this)}></div>
                    <div className="right" onClick={this.tick_right.bind(this)}></div>
                </div>
            </div>
        );
    }
}

export default Auto;