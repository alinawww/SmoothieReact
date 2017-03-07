

class Button extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
      this.props.randomNumber(e.target.value)
  }
  render() {
    return (
      <div>
        <button value={this.props.randomNumber} onClick={this.handleClick}>Give me random smoothie</button>
      </div>
    );
  }
}

class Smoothie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            randomNumber: 0
        };
        this.handleRandomNumber = this.handleRandomNumber.bind(this);
    }

    handleRandomNumber(){
        this.setState({
            randomNumber: Math.floor((Math.random() * 30) + 1)
        })
    }
    render() {
        const selectedSmoothie = this.props.smoothies[this.state.randomNumber] ? this.props.smoothies[this.state.randomNumber] : null;
        if (selectedSmoothie !== null) {
            const smoothieRecipe = selectedSmoothie.recipe
            const name = smoothieRecipe.label;
            const image = smoothieRecipe.image;
            const ingredients = smoothieRecipe.ingredientLines;
            const calories = smoothieRecipe.calories;
            const cautions = smoothieRecipe.cautions;
            console.log(smoothieRecipe);
            const nutrients = smoothieRecipe.totalNutrients;
            const smoothieWeight = smoothieRecipe.totalWeight * 1000;
            let digestLabels = [];
            let digestLabelsValues = [];
            for (var nutrientKey in nutrients) {
              if (nutrients.hasOwnProperty(nutrientKey)) {
                const nutrient = nutrients[nutrientKey];
                console.log(nutrient);
                digestLabels.push(nutrient.label)
                let amount = nutrient.quantity;
                if (nutrient.unit == "µg") {
                    amount = nutrient.quantity * 1000;
                }
                if (nutrient.unit == "g") {
                    amount = nutrient.quantity / 1000;
                }

                let howMuchOfDailyNecessary = amount * 100 / smoothieWeight;
                // console.log(Math.floor(howMuchOfDailyNecessary));
                if (true) {

                }
                digestLabelsValues.push(howMuchOfDailyNecessary)

              }


            }


            var data = {
                labels: digestLabels,
                datasets: [
                    {
                        data: digestLabelsValues,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF5733",
                            "#FFDA33",
                            "#DDFF33",
                            "#8AFF33",
                            "#3633FF",
                            "#FF33B8",
                            "#3C33FF",
                            "#33FF8A",
                            "#22A058",
                            "#23623E",
                            "#CED854",
                            "#54D862",
                            "#54D8D8",
                            "#A454D8",
                            "#54B4D8",
                            "#D8548A",
                            "#927A84",
                            "#000000"

                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF5733",
                            "#FFDA33",
                            "#DDFF33",
                            "#8AFF33",
                            "#3633FF",
                            "#FF33B8",
                            "#3C33FF",
                            "#33FF8A",
                            "#22A058",
                            "#23623E",
                            "#CED854",
                            "#54D862",
                            "#54D8D8",
                            "#A454D8",
                            "#54B4D8",
                            "#D8548A",
                            "#927A84",
                            "#000000"
                        ]
                    }]
            };
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    animation:{
                        animateScale:false
                    }
                }
            });
            let shouldBeShown;
            if ( typeof name !== undefined && typeof image !== undefined) {
                shouldBeShown = true;
            }
            if (shouldBeShown) {
                return (
                    <div>
                      <img width="100" src={image} />
                        <p>{name}</p>
                        <p>{ingredients}</p>
                      <Button value={this.state.randomNumber} randomNumber={this.handleRandomNumber}/>
                    </div>
                );
            }

        }

    }
}


var App = React.createClass({

  getInitialState: function() {
    return {
      smoothies: [],
      loading: true
    }
  },

  componentDidMount: function() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    this.serverRequest =
      axios.get(this.props.source)
        .then(function(result) {
          th.setState({
            smoothies: result.data.hits,
            loading: false,
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render() {
    if (this.state.loading) {
      return (<p>loading</p>)
    }
    else {
      return (
        <div>
          <Smoothie smoothies={this.state.smoothies} />
        </div>
      )
    }
  }
});

ReactDOM.render(<App source="https://api.edamam.com/search?q=smoothie&from=0&to=30" />, document.querySelector("#root"));
