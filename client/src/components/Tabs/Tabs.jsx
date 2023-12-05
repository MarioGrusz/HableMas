import TabButton from '../TabButton/TabButton';
import './index.scss';
import { useState } from 'react';


const Tab = ({ tabs }) => {

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
      setActiveTab(tabId);
  };


  return (
    <figure className="tab-container">

      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <TabButton
          key={index}
          className={activeTab === tab.id ? 'tab-active' : ''}
          text={tab.label}
          content={tab.label}
          onClick={() => handleTabClick(tab.id)}
          activeTab={activeTab}
          id={tab.id}
        />
        ))}
      </div>

      <div className="tab-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-panel ${activeTab === tab.id ? 'active' : ''}`}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>

    </figure>
  );  
};


export default Tab;