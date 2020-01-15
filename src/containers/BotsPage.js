import React from "react";
import BotCollection from './BotCollection'
import BotArmy from './YourBotArmy'

const botUrl = 'https://bot-battler-api.herokuapp.com/api/v1/bots'

class BotsPage extends React.Component {
  //start here with your code for step one
  constructor() {
    super()
    this.state = {
      allBots: [],
      myArmy: []
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

  filteredBots = () => this.state.allBots.filter(bot => !this.state.myArmy.includes(bot))

  render() {
    return (
      <div>
        <BotArmy bots={this.state.myArmy} discharge={this.dischargeBot} />
        <BotCollection bots={this.filteredBots()} recruit={this.recruitBot} />
      </div>
    );
  }

}

export default BotsPage;
