import React from "react";
import Menu from "./Menu";
import Orders from "./Orders";
import MenuAdmin from "./MenuAdmin";
import base from '../base';
// import firebase from 'firebase/app';




class App extends React.Component{
    state = {
        burgers: {},
        order: {},
        scrollingDirection: {},
        numberClasses: {},
    }
    componentDidMount(){
        const {params} = this.props.match;
        const scrollingDirection = {isScrolOrdrNumUp: true}
        const numberClasses = {className: '', transitionClass: ''}


        const localStorageRef = localStorage.getItem(params.restaurantId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)})
        }
       
        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
          });


        this.setState({scrollingDirection})
        this.setState({numberClasses})
    }

    componentDidUpdate(){
        
        this.setLocalStore();

    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    setLocalStore = () => {
        const {params} = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
    }
    
    addBurger = (burger) => {
        //making copy of state 
        const burgers = {...this.state.burgers};
        //adding new burger
        burgers[`burger${Date.now()}`]=burger;
        //add our burgers to state
        this.setState({burgers})
    }
    removeBurger = (key) => {
        //making copy of burgers state 
        const burgers = {...this.state.burgers};
        //delete burger
        burgers[key] = null;
        //add our burgers to state
        this.setState({burgers})

        //making copy of order state 
        const order = {...this.state.order};
        //if burger exist delete burger
        order[key] && delete order[key] 
        //add our order to state
        this.setState({order});
    }
    changeBurger = (burger, key) => {
        //making copy of state 
        const burgers = {...this.state.burgers};
        //changing burger
        burgers[key]=burger;
        //add our burgers to state
        this.setState({burgers})
    }
    addOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order});

        this.changeScrollDirection(true);
        this.changeNumberClasses(true);
    }
    removeOrder = (key) => {
        const order = {...this.state.order};
        order[key] > 1 ? order[key] -= 1 : delete order[key];
        this.setState({order});

        this.setLocalStore();
        

        this.changeScrollDirection(false);
        this.changeNumberClasses(false);
    }
    loadSamples = (burgers) => {
        this.setState({burgers: burgers})
    }


    changeScrollDirection = (isDirectionUp) => {
        const scrollingDirection = {...this.state.scrollingDirection}
        scrollingDirection['isScrolOrdrNumUp'] = isDirectionUp;
        this.setState({scrollingDirection});
    }

    changeNumberClasses = (addingOrder) => {
        let numberClasses = {...this.state.numberClasses}

        numberClasses['transitionClass'] = 'orders__transition'
        this.setState({numberClasses})

        if(addingOrder){
            numberClasses['className'] = 'orders__number-down';
            this.setState({numberClasses});
            setTimeout(()=>{
                numberClasses['transitionClass'] = 'orders__transition orders__transition-up'
                this.setState({numberClasses})

                setTimeout(()=>{
                    numberClasses['transitionClass'] = 'none orders__transition'
                    this.setState({numberClasses})
                }, 800)

            }, 0)
         } else {
            numberClasses['className'] = 'orders__number-up';
            this.setState({numberClasses});
            setTimeout(()=>{
                numberClasses['transitionClass'] = 'orders__transition orders__transition-down'
                this.setState({numberClasses})

                setTimeout(()=>{
                    numberClasses['transitionClass'] = 'none orders__transition'
                    this.setState({numberClasses})
                }, 800)

            }, 0)
         }
        setTimeout(()=>{
            numberClasses['className'] = 'orders__number'
            this.setState({numberClasses})
        }, 0)


        // setTimeout(()=>{
        //         let numberClasses = {...this.state.numberClasses}
        //         numberClasses['transitionClass'] = 'orders__transition orders__transition-absolute'
        //         this.setState({numberClasses})

                
        //         setTimeout(()=>{
        //             let numberClasses = {...this.state.numberClasses}
        //             numberClasses['transitionClass'] = 'none orders__transition-absolute'
        //             this.setState({numberClasses})
                    
    
    
        //         }, 800)

        //     }, 0)
        
    }

    



    render(){
        return(
            <div className='burgers'>
                <Menu title='Hot Burgers Best' burgers={this.state.burgers} addOrder={this.addOrder}/>
                <Orders burgers={this.state.burgers} order={this.state.order} scrollingDirection={this.state.scrollingDirection} numberClasses={this.state.numberClasses} removeOrder={this.removeOrder}/>
                <MenuAdmin addBurger={this.addBurger} loadSamples={this.loadSamples} burgers={this.state.burgers} changeBurger={this.changeBurger} removeBurger={this.removeBurger}/>
            </div>
        )
    }
}

export default App;