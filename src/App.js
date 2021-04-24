import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";

import "./App.css";

class App extends Component {
  state = { scraped: [] };

  componentDidMount() {
    // Fetch HTML
    rp("https://cors-anywhere.herokuapp.com/http://quotes.toscrape.com/")
      .then(html => {
        let scraped = [];
        let $ = cheerio.load(html);
        console.log(html);

        //use cheerio to query id, class or tags
        $(".quote").each(function(i, element) {
          let name = $(this)
            .prepend()
            .text();
          scraped.push(name);
        });

        this.setState({ scraped });
      })
      .catch(function(err) {
        console.log("scraper failed");
      });
  }
//render to the page the scraped html
  render() {
    return (
      <div>
        <ul>
          {this.state.scraped.map(name => {
            return <ul key={name}>{name}</ul>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;