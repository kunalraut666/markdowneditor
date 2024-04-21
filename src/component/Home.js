import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useLocation} from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables   } from 'chart.js';
import { ArrowLeftCircle } from 'react-bootstrap-icons';


Chart.register(...registerables  );

function Home(props) {

  const location = useLocation();
  const [Urltext, UrlsetText] = useState('');
  const [chartData, setChartData] = useState(null);
  const [showBarGraph, setShowBarGraph] = useState(false);
  const currentPathname = window.location.pathname;
  const [showSummary, setShowSummary] = useState(false);
  const [showDensity, setShowDensity] = useState(false);

  const toggleBarGraph = () => {
    setShowBarGraph(!showBarGraph); // Toggle the state to show or hide the bar graph
  };

  const generateChartData = () => {
    const data = {
      labels: ['Words', 'Characters', 'Uppercase words', 'Lowercase words', 'Sentences', 'Paragraphs', 'Spaces', 'Punctuations', 'Uppercase Letters', 'Lowercase Letters', 'Average Time Taken to read'],
      datasets: [
        {
          label: 'Count',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: [
            countWords(),
            Urltext.length,
            calculateCaseCounts().upperCount,
            calculateCaseCounts().lowerCount,
            calculateSentences(),
            countParagraphs(),
            countSpaces(),
            countPunctuation(),
            countUppercaseLetters(),
            countLowercaseLetters(),
            (0.24 * countWords()).toFixed(2)
          ],
        },
      ],
    };

    setChartData(data);
    setShowBarGraph(true);
  };
  


  const handleGoBack = () => {
    window.history.back();
  };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const textParam = params.get('text');
        if (textParam) {
            UrlsetText(decodeURIComponent(textParam));
        }
    }, [location]);


    //setting style
    const mystyle = {
        height: '100px'
      }

      const mystyle2 = {
        color: 'red',
        backgroundColor: 'black'
      }

    //change to uppercase method  
    const changeUpCase = (e) => {
        let upText = Urltext.toUpperCase();
        UrlsetText(upText);
    }
    //change to lowercase method
    const changeLowCase = () => {
        let loText = Urltext.toLowerCase();
        UrlsetText(loText);
    }
    //clear text method
    const clearText = () => {
        UrlsetText("");
    }

    const countWords = () => {
        if (typeof Urltext !== 'string') {
            return 0; // Return 0 if text is not a string
          }
        // Remove leading and trailing whitespaces
        const trimmedText = Urltext.trim();
        // Split text by whitespaces to count words
        const words = trimmedText.split(/\s+/);
        // Filter out empty strings to handle multiple spaces between words
        const filteredWords = words.filter(word => word !== '');
        // Return the number of words
        return filteredWords.length;
      };

      const calculateWordDensity = () => {
        const words = Urltext.trim().split(/\s+/).map(word => word.replace(/[^\w\s]/gi, '').toLowerCase());
        const wordCount = words.length;
        const wordDensityMap = {};
    
        words.forEach(word => {
          if (word in wordDensityMap) {
            wordDensityMap[word]++;
          } else {
            wordDensityMap[word] = 1;
          }
        });
    
        const wordDensityList = Object.keys(wordDensityMap).map(word => ({
          word: word,
          density: (wordDensityMap[word] / wordCount) * 100
        }));
    
        return wordDensityList;
      };

      const calculateCaseCounts = () => {

        if (Urltext.trim() === '') {
            return { upperCount: 0, lowerCount: 0 };
          }

        const words = Urltext.trim().split(/\s+/);
        let upperCount = 0;
        let lowerCount = 0;
    
        words.forEach(word => {
          if (word.toUpperCase() === word) {
            upperCount++;
          } else if (word.toLowerCase() === word) {
            lowerCount++;
          }
        });
    
        return { upperCount, lowerCount };
      };

      const calculateSentences = () => {
        if (typeof Urltext !== 'string') {
          return 0;
        }
        // Split the text into sentences based on common punctuation marks
        const sentences = Urltext.trim().split(/[.!?]+/);
        // Remove empty sentences
        const filteredSentences = sentences.filter(sentence => sentence.trim() !== '');
        return filteredSentences.length;
      };

      const countParagraphs = () => {
        if (typeof Urltext !== 'string') {
          return 0;
        }
        const paragraphs = Urltext.split('\n').filter(paragraph => paragraph.trim() !== '');
        return paragraphs.length;
      };
    
      const countSpaces = () => {
        if (typeof Urltext !== 'string') {
          return 0;
        }
        const spaces = Urltext.split('').filter(char => char === ' ');
        return spaces.length;
      };
    
      const countPunctuation = () => {
        if (typeof Urltext !== 'string') {
          return 0;
        }
        const punctuationMarks = Urltext.split('').filter(char => /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(char));
        return punctuationMarks.length;
      };
    
      const countUppercaseLetters = () => {
        if (typeof Urltext !== 'string') {
          return 0;
        }
        const uppercaseLetters = Urltext.split('').filter(char => /[A-Z]/.test(char));
        return uppercaseLetters.length;
      };
    
      const countLowercaseLetters = () => {
        if (typeof Urltext !== 'string') {
          return 0;
        }
        const lowercaseLetters = Urltext.split('').filter(char => /[a-z]/.test(char));
        return lowercaseLetters.length;
      };
    
    const toggleSummary = () => {
      if (!showSummary) {
        generateChartData();
      } else {
        setShowBarGraph(false); // Hide the bar graph when hiding the summary
      }
      setShowSummary(!showSummary);
    };
      
    const toggleDensity = () => {
      if (!showDensity) {
        generateWordDensityGraph(); // Generate word density graph when showing density
      } else {
        setShowBarGraph(false); // Hide the bar graph when hiding density
      }
      setShowDensity(!showDensity); // Toggle density visibility
    };

  // Function to generate word density bar graph
  const generateWordDensityGraph = () => {
    const wordDensityChartData = generateWordDensityChartData();
    setChartData(wordDensityChartData);
    setShowBarGraph(true); // Show the bar graph
  };

  // Function to generate data for word density bar graph
  const generateWordDensityChartData = () => {
    const wordDensity = calculateWordDensity();
    const labels = wordDensity.map(item => item.word);
    const densities = wordDensity.map(item => item.density);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Word Density',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: densities,
        },
      ],
    };
  };

  const backgroundImageStyle = {
    backgroundColor: currentPathname === '/analytics' ? '#F2F2F2' : 'transparent', // Light gray background
    minHeight: '100vh',// Set a minimum height to cover the entire viewport
  };

  return (
    <>
    <div className='grid' style={backgroundImageStyle}>
      <a href='/'><ArrowLeftCircle size={25} style={{
        color: 'black',
      }}/></a>
      <h2 className="container mx-5">{props.title}</h2>
      <h6 className="container mx-5">You can edit and analyze here it will not affect your markdown.</h6>
      <div className="form-floating container my-4">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          style={mystyle}
          onChange={(e) => UrlsetText(e.target.value)}
          // value={text}
          value={Urltext}
        ></textarea>
        <Button className="btn btn-primary my-2" onClick={changeUpCase}>
          Uppercase
        </Button>

        <Button className="btn btn-primary my-2 mx-1" onClick={changeLowCase}>
          Lowercase
        </Button>

        <Button className="btn btn-primary my-2" onClick={clearText}>
          Clear
        </Button>

        <Button className="btn btn-primary my-2 mx-1" onClick={toggleSummary}>
            {showSummary ? 'Hide Summary' : 'Show Summary'}
        </Button>

        <Button className="btn btn-primary my-2 mx-1" onClick={toggleDensity}>
            {showDensity ? 'Hide Density' : 'Show Density'}
        </Button>
      </div>
      <div className="container mx-5 my-1">
          {chartData && showBarGraph  && (
            <div className="row">
              <div className="col-md-6">
                <h4>Bar Graph:</h4>
                <Bar data={chartData} />
              </div>
            </div>
          )}
      </div>
      </div>
    </>
  );
}

export default Home
