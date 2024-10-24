function Preloader() {
  return (
    <>
      {/* Preloader */}
      <div id="preloader">
        <div className="loading">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_remmdtqv.json"
            background="transparent"
            speed={3}
            style={{ width: 300, height: 300 }}
            loop=""
            autoPlay=""
          />
        </div>
      </div>
      {/* End Preloader */}
    </>
  );
}

export default Preloader;
