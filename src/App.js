import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";

import "./App.css";

class App extends Component {
  state = { names: [] };

  componentDidMount() {
    // Fetch HTML
    rp("https://abc.utah.gov/products/interactive-product-list/")
      .then(html => {
        let names = [];
        let $ = cheerio.load(html);
        console.log(html);

        //use cheerio to query id, class or tags
        $(".padding10").each(function(i, element) {
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
            return <li key={name}>{name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;