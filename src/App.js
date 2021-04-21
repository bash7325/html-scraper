import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";

import "./App.css";

class App extends Component {
  state = { names: [] };

  componentDidMount() {
    // Fetch HTML
    rp("https://cors-anywhere.herokuapp.com/http://quotes.toscrape.com/")
      .then(html => {
        let names = [];
        let $ = cheerio.load(html);
        console.log(html);

        //use cheerio to query id, class or tags
        $(".quote").each(function(i, element) {
          let name = $(this)
            .prepend()
            .text();
          names.push(name);
        });

        this.setState({ names });
      })
      .catch(function(err) {
        console.log("crawl failed");
      });
  }
//render to the page the scraped html
  render() {
    return (
      <div>
        <ul>
          {this.state.names.map(name => {
            return <ul key={name}>{name}</ul>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;