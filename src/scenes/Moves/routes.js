import React from 'react';

import PrivateRoute from 'shared/User/PrivateRoute';
import WizardPage from 'shared/WizardPage';
import Agreement from 'scenes/Legalese';
import Transition from 'scenes/Moves/Transition';
import MoveType from 'scenes/Moves/MoveTypeWizard';
import PpmSize from 'scenes/Moves/Ppm/PPMSizeWizard';
import PpmWeight from 'scenes/Moves/Ppm/Weight';

const Placeholder = props => {
  return (
    <WizardPage
      handleSubmit={() => undefined}
      pageList={props.pageList}
      pageKey={props.pageKey}
    >
      <h1>Placeholder for {props.title}</h1>
    </WizardPage>
  );
};

const stub = (key, pages, component) => ({ match }) => {
  if (component) {
    const pageComponent = React.createElement(component, { match }, null);
    return (
      <WizardPage handleSubmit={() => undefined} pageList={pages} pageKey={key}>
        {pageComponent}
      </WizardPage>
    );
  } else {
    return <Placeholder pageList={pages} pageKey={key} title={key} />;
  }
};

export default () => {
  const pages = {
    '/moves/:moveId': {
      render: (key, pages) => ({ match }) => (
        <MoveType pages={pages} pageKey={key} match={match} />
      ),
    },
    '/moves/:moveId/ppm-transition': {
      render: (key, pages) => ({ match }) => (
        <WizardPage
          handleSubmit={() => undefined}
          pageList={pages}
          pageKey={key}
        >
          <Transition />
        </WizardPage>
      ),
    },
    '/moves/:moveId/ppm-size': {
      render: (key, pages) => ({ match }) => (
        <PpmSize pages={pages} pageKey={key} match={match} />
      ),
    },
    '/moves/:moveId/ppm-incentive': {
      render: (key, pages) => ({ match }) => (
        <PpmWeight pages={pages} pageKey={key} match={match} />
      ),
    },
    '/moves/:moveId/agreement': { render: stub },
  };
  const pageList = Object.keys(pages);
  const componentMap = {
    agreement: Agreement,
  };
  return pageList.map(key => {
    const step = key.split('/').pop();
    var component = componentMap[step];
    const render = pages[key].render(key, pageList, component);
    return <PrivateRoute exact path={key} key={key} render={render} />;
  });
};
