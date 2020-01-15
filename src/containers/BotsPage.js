import React from "react";
import BotCollection from './BotCollection'
import BotArmy from './YourBotArmy'
import {BrowserRouter as Route, Router} from 'react-router-dom'
import BotSpecs from "../components/BotSpecs";

const botUrl = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {
  //start here with your code for step one
  constructor() {
    super()
    this.state = {
      allBots: [],
      myArmy: [],
      activeBot: {},
      showView: false
    }
  }

  componentDidMount() {
    fetch(botUrl)
    .then(response => response.json())
    .then(data => this.setState({allBots: data}))
  }

  recruitBot = (e, bot) => {
    this.setState({myArmy: [...this.state.myArmy, bot]})
  }

  dischargeBot = (e, selectedBot) => {
    this.setState({myArmy: this.state.myArmy.filter(bot => bot !== selectedBot)})
  }

  toggleViewState = (e, selectedBot) => {
    this.setState({
      showView: !this.state.showView,
      activeBot: selectedBot
    })
  } 

  filteredBots = () => this.state.allBots.filter(bot => !this.state.myArmy.includes(bot))

  render() {
    return (
      <div>
        <BotArmy bots={this.state.myArmy} discharge={this.dischargeBot} />

        {this.state.showView ? <BotSpecs bot={this.state.activeBot} viewCollection={this.toggleViewState} enlist={this.recruitBot}/> : <BotCollection bots={this.filteredBots()} viewDetails={this.toggleViewState} />}
      </div>
    );
  }

}

export default BotsPage;
