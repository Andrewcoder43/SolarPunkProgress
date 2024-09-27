import React from 'react';

function ProgressSection({ title, timeUnit, emoji, index, timeRefs, barRefs }) {
    return (
        <section className="section">
            <div className="name">
                <h3>{emoji}{title}</h3>
                <p><span ref={el => timeRefs.current[index] = el}></span> {timeUnit} left</p>
            </div>
            <div className="progress">
                <div ref={el => barRefs.current[index] = el} className="bar progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                    aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                    style={{ width: '75%' }}></div>
            </div>
        </section>
    );
}

export default ProgressSection;