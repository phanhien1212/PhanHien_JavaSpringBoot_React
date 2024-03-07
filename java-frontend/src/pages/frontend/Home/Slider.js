const Slider = () => {
  return (
    <div className="section-index-slider" id="home-slider">
      <div className="container container-md-pd0">
        <div className="slider-owl owl-carousel owl-loaded owl-drag">
          <div className="owl-stage-outer"><div className="owl-stage" style={{ transform: 'translate3d(-3420px, 0px, 0px)', transition: 'all 0s ease 0s', width: 9120 }}>
            <div className="owl-item" style={{ width: 1140 }}><div className="slider-item">
              <div className="slide--image">
                <a href="collections/tat-ca-san-pham" title="alt3">
                 

                    <img className="owl-lazy" src={require('../../../assets/home_slider_image_2 (1).png')} alt="alt3" />
                
                </a>
              </div>
            </div></div><div className="owl-item" style={{ width: 1140 }}><div className="slider-item">
              <div className="slide--image">
                <a href="collections/tat-ca-san-pham" title>
               

                    <img className="owl-lazy" src={require('../../../assets/home_slider_image_2 (1).png')} alt />
                 
                </a>
              </div>
            </div></div><div className="owl-item" style={{ width: 1140 }}><div className="slider-item">
              <div className="slide--image">
                <a href="collections/tat-ca-san-pham" title>
                

                    <img src={require('../../../assets/home_slider_image_2 (1).png')} alt />
                  
                </a>
              </div>
            </div></div><div className="owl-item" style={{ width: 1140 }}><div className="slider-item">
              <div className="slide--image">
                <a href="collections/tat-ca-san-pham" title>
                  
                    <img className="owl-lazy" src={require('../../../assets/home_slider_image_2 (1).png')} alt style={{ opacity: 1 }} />
                  
                </a>
              </div>
            </div></div>
          </div>
          </div>
          <div className="owl-nav">
            <button type="button" role="presentation" className="owl-prev" />
            <button type="button" role="presentation" className="owl-next" />
          </div>
          <div className="owl-dots">
            <button role="button" className="owl-dot" aria-label={1}>
              <span />
            </button>
            <button role="button" className="owl-dot active" aria-label={2}>
              <span />
            </button>
            <button role="button" className="owl-dot" aria-label={3}>
              <span />
            </button>
            <button role="button" className="owl-dot" aria-label={4}>
              <span />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
