import React from "react";
import BotCollection from './BotCollection'
import BotArmy from './YourBotArmy'
// import {BrowserRouter as Route, Router} from 'react-router-dom'
import BotSpecs from "../components/BotSpecs";
import OptionsBar from '../components/optionsBar'

const botUrl = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      allBots: [],
      myArmy: [],
      activeBot: {},
      showView: false,
      searchOptions: {
        searchTerm: '',
        botClass: ''
      }
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

  changeHandler = (e) => {
    this.setState({
      searchOptions: {
        ...this.state.searchOptions,
        [e.target.name]: e.target.value
      }
    })
}

  filteredBots = (botCollection) => botCollection.filter(bot => bot.name.includes(this.state.searchOptions.searchTerm) && (!!this.state.searchOptions.botClass ? bot.bot_class === this.state.searchOptions.botClass : true))
  
  noArmyFilter = () => this.filteredBots(this.state.allBots.filter(bot => !this.state.myArmy.includes(bot)))
  
  render() {
    return (
      <div>
        <OptionsBar changeHandler={this.changeHandler} presentOptions={this.state.searchOptions}/>
        <BotArmy bots={this.filteredBots(this.state.myArmy)} discharge={this.dischargeBot} />

        {this.state.showView ? <BotSpecs bot={this.state.activeBot} viewCollection={this.toggleViewState} enlist={this.recruitBot}/> : <BotCollection bots={this.noArmyFilter()} viewDetails={this.toggleViewState} />}
      </div>
    );
  }
}

export default BotsPage;
