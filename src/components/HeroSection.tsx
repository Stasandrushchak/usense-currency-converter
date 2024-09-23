import React from "react";

type HeroSectionProps = {
  eurRate: number | null;
  usdRate: number | null;
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  eurRate,
  usdRate,
}) => (
  <section className="hero is-warning">
    <div className="hero-body">
      <h1 className="title has-text-centered">Exchange Rate</h1>
      <div className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <div className="box">
                <h2 className="title">EUR</h2>
                <p className="title is-4">{eurRate?.toFixed(2)} UAH</p>
              </div>
            </div>
            <div className="column">
              <div className="box">
                <h2 className="title">USD</h2>
                <p className="title is-4">{usdRate?.toFixed(2)} UAH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
