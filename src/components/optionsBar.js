import React, { Component } from "react";


export default class OptionsBar extends Component {

    render() {
        const {changeHandler, presentOptions: {searchTerm, botClass}} = this.props
        return (
            <div>
                    <label>Search For Bot by Name</label>
                    <input type='text' name='searchTerm' value={searchTerm} onChange={changeHandler}/>

                    <label>Filter By Bot Class</label>
                    <select name='botClass' value={botClass} onChange={changeHandler}>
                        <option value=''>All Bots</option>
                        <option value='Defender'>Defender</option>
                        <option value='Assault'>Assault</option>
                        <option value='Support'>Support</option>
                    </select>
            </div>
        )
    }
}