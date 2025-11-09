import React, { useState, useEffect, useRef } from 'react';

// Animated Donut Chart Component
export const AnimatedDonutChart = ({ data, title, size = 200 }) => {
  const [animatedData, setAnimatedData] = useState([]);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  useEffect(() => {
    // Animate data on mount
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const createPath = (percentage, cumulativePercentage) => {
    const startAngle = cumulativePercentage * 3.6 - 90;
    const endAngle = (cumulativePercentage + percentage) * 3.6 - 90;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    const radius = size / 2 - 20;
    const innerRadius = radius - 30;
    
    const x1 = size / 2 + radius * Math.cos(startAngleRad);
    const y1 = size / 2 + radius * Math.sin(startAngleRad);
    const x2 = size / 2 + radius * Math.cos(endAngleRad);
    const y2 = size / 2 + radius * Math.sin(endAngleRad);
    
    const x3 = size / 2 + innerRadius * Math.cos(endAngleRad);
    const y3 = size / 2 + innerRadius * Math.sin(endAngleRad);
    const x4 = size / 2 + innerRadius * Math.cos(startAngleRad);
    const y4 = size / 2 + innerRadius * Math.sin(startAngleRad);
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  };

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="donut-chart-wrapper">
        <svg width={size} height={size} className="donut-chart">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7877c6" />
              <stop offset="100%" stopColor="#ff77c6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff77c6" />
              <stop offset="100%" stopColor="#77dbff" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#77dbff" />
              <stop offset="100%" stopColor="#7877c6" />
            </linearGradient>
          </defs>
          
          {animatedData.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const path = createPath(percentage, cumulativePercentage);
            const currentCumulative = cumulativePercentage;
            cumulativePercentage += percentage;
            
            return (
              <path
                key={index}
                d={path}
                fill={`url(#gradient${(index % 3) + 1})`}
                className="donut-segment"
                style={{
                  transform: hoveredSegment === index ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: `${size / 2}px ${size / 2}px`,
                  transition: 'all 0.3s ease',
                  filter: hoveredSegment === index ? 'drop-shadow(0 0 10px rgba(120, 119, 198, 0.6))' : 'none'
                }}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
          
          {/* Center text */}
          <text
            x={size / 2}
            y={size / 2 - 10}
            textAnchor="middle"
            className="chart-center-text"
            fill="#ffffff"
            fontSize="24"
            fontWeight="bold"
          >
            {total}
          </text>
          <text
            x={size / 2}
            y={size / 2 + 15}
            textAnchor="middle"
            className="chart-center-label"
            fill="rgba(255, 255, 255, 0.7)"
            fontSize="12"
          >
            Total
          </text>
        </svg>
        
        <div className="chart-legend">
          {data.map((item, index) => (
            <div
              key={index}
              className={`legend-item ${hoveredSegment === index ? 'highlighted' : ''}`}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div
                className="legend-color"
                style={{
                  background: `linear-gradient(135deg, ${
                    index % 3 === 0 ? '#7877c6, #ff77c6' :
                    index % 3 === 1 ? '#ff77c6, #77dbff' :
                    '#77dbff, #7877c6'
                  })`
                }}
              />
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Animated Bar Chart Component
export const AnimatedBarChart = ({ data, title, height = 300 }) => {
  const [animatedData, setAnimatedData] = useState(data.map(item => ({ ...item, animatedValue: 0 })));
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data.map(item => ({ ...item, animatedValue: item.value })));
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="bar-chart-wrapper" style={{ height }}>
        <div className="bar-chart">
          {animatedData.map((item, index) => {
            const barHeight = (item.animatedValue / maxValue) * (height - 60);
            return (
              <div
                key={index}
                className="bar-item"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div className="bar-value-label">
                  {hoveredBar === index && (
                    <span className="value-tooltip">{item.value}</span>
                  )}
                </div>
                <div
                  className="bar"
                  style={{
                    height: `${barHeight}px`,
                    background: `linear-gradient(180deg, ${
                      index % 3 === 0 ? '#7877c6, #ff77c6' :
                      index % 3 === 1 ? '#ff77c6, #77dbff' :
                      '#77dbff, #7877c6'
                    })`,
                    transform: hoveredBar === index ? 'scaleY(1.05)' : 'scaleY(1)',
                    filter: hoveredBar === index ? 'drop-shadow(0 0 15px rgba(120, 119, 198, 0.6))' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
                <div className="bar-label">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Animated Line Chart Component
export const AnimatedLineChart = ({ data, title, width = 400, height = 200 }) => {
  const [animatedPath, setAnimatedPath] = useState('');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const maxValue = Math.max(...data.map(item => item.value));
    const minValue = Math.min(...data.map(item => item.value));
    const range = maxValue - minValue || 1;
    
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * (width - 40) + 20;
      const y = height - 40 - ((item.value - minValue) / range) * (height - 60);
      return { x, y, ...item };
    });

    // Create smooth curve path
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      const controlX = (prevPoint.x + currentPoint.x) / 2;
      path += ` Q ${controlX} ${prevPoint.y} ${currentPoint.x} ${currentPoint.y}`;
    }

    setTimeout(() => setAnimatedPath(path), 500);
  }, [data, width, height]);

  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="line-chart-wrapper">
        <svg width={width} height={height} className="line-chart">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7877c6" />
              <stop offset="50%" stopColor="#ff77c6" />
              <stop offset="100%" stopColor="#77dbff" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(120, 119, 198, 0.3)" />
              <stop offset="100%" stopColor="rgba(120, 119, 198, 0)" />
            </linearGradient>
          </defs>
          
          {/* Area under curve */}
          <path
            d={`${animatedPath} L ${width - 20} ${height - 20} L 20 ${height - 20} Z`}
            fill="url(#areaGradient)"
            className="line-area"
          />
          
          {/* Main line */}
          <path
            d={animatedPath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            className="line-path"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(120, 119, 198, 0.4))'
            }}
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * (width - 40) + 20;
            const y = height - 40 - ((item.value - minValue) / range) * (height - 60);
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={hoveredPoint === index ? 8 : 5}
                fill="#ffffff"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                className="line-point"
                style={{
                  transition: 'all 0.3s ease',
                  filter: hoveredPoint === index ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' : 'none'
                }}
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}
          
          {/* Tooltip */}
          {hoveredPoint !== null && (
            <g>
              <rect
                x={((hoveredPoint / (data.length - 1)) * (width - 40) + 20) - 25}
                y={height - 40 - ((data[hoveredPoint].value - minValue) / range) * (height - 60) - 35}
                width="50"
                height="25"
                fill="rgba(10, 10, 15, 0.9)"
                rx="5"
                stroke="rgba(255, 255, 255, 0.2)"
              />
              <text
                x={(hoveredPoint / (data.length - 1)) * (width - 40) + 20}
                y={height - 40 - ((data[hoveredPoint].value - minValue) / range) * (height - 60) - 18}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="12"
                fontWeight="bold"
              >
                {data[hoveredPoint].value}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

// Radial Progress Chart
export const RadialProgress = ({ percentage, title, size = 120 }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="radial-progress-container">
      <svg width={size} height={size} className="radial-progress">
        <defs>
          <linearGradient id="radialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7877c6" />
            <stop offset="100%" stopColor="#ff77c6" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#radialGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out',
            transform: 'rotate(-90deg)',
            transformOrigin: `${size / 2}px ${size / 2}px`,
            filter: 'drop-shadow(0 0 10px rgba(120, 119, 198, 0.5))'
          }}
        />
        
        {/* Center text */}
        <text
          x={size / 2}
          y={size / 2 - 5}
          textAnchor="middle"
          className="radial-percentage"
          fill="#ffffff"
          fontSize="18"
          fontWeight="bold"
        >
          {Math.round(animatedPercentage)}%
        </text>
        <text
          x={size / 2}
          y={size / 2 + 15}
          textAnchor="middle"
          className="radial-title"
          fill="rgba(255, 255, 255, 0.7)"
          fontSize="10"
        >
          {title}
        </text>
      </svg>
    </div>
  );
};