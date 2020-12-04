import React from 'react';

const Timeline = (props) => {
	return (
		<div>
			<h1> How it Works: </h1>
			<div className="timeline">
				<div className="timeline-items">
					<div className="timeline-item">
						<div className="steps">
							1. Choose your produce
						</div>
					</div>
					<div className="timeline-item">
						<div className="steps">
							2. Order & check out
						</div>
					</div>
					<div className="timeline-item">
						<div className="steps">
							3. Pick up your produce at Groundworks Somerville!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Timeline;