import React from 'react';
import aboutImg1 from "../assets/img/about-img1.png";
import aboutImg2 from "../assets/img/about-img2.png";
import aboutImg3 from "../assets/img/about-img3.png";
import aboutImg4 from "../assets/img/about-img4.png";

function About() {
  return (
    <div style={{ backgroundColor: '#F2F2F2' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div className="card h-100 zoom-effect">
              <img src={aboutImg1} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Landing Page</h5>
                <p className="card-text">
                Welcome to the landing page for the Markdown Editor, where you can seamlessly edit your Markdown content and easily download it.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 zoom-effect">
              <img src={aboutImg2} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Preview of Your Markdown</h5>
                <p className="card-text">
                Here's the preview, allowing you to visualize the appearance of your Markdown content.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 zoom-effect">
              <img src={aboutImg3} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Built-in Text Analyzer</h5>
                <p className="card-text">
                I've incorporated a text analyzer feature into the Markdown editor, empowering users to analyze their text.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col">
            <div className="card h-100 zoom-effect">
              <img src={aboutImg4} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Visualizer</h5>
                <p className="card-text">
                I've integrated a bar graph feature that allows users to visualize various text metrics such as word count, character count, occurrences of uppercase and lowercase words, and more. Additionally, users can also visualize word density for a comprehensive analysis of their content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
