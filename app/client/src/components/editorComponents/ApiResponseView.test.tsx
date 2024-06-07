import React from "react";
import { render } from "@testing-library/react";
import ApiResponseView from "./ApiResponseView";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { unitTestBaseMockStore } from "layoutSystems/common/dropTarget/unitTestUtils";
import { lightTheme } from "selectors/themeSelectors";
import { BrowserRouter as Router } from "react-router-dom";
import { EditorViewMode } from "@appsmith/entities/IDE/constants";
import "@testing-library/jest-dom/extend-expect";

jest.mock("./EntityBottomTabs", () => ({
  __esModule: true,
  default: () => <div />,
}));

const mockStore = configureStore([]);

const storeState = {
  ...unitTestBaseMockStore,
  evaluations: {
    tree: {},
  },
  ui: {
    ...unitTestBaseMockStore.ui,
    gitSync: {
      branches: [],
      fetchingBranches: false,
      isDeploying: false,
      protectedBranchesLoading: false,
      protectedBranches: [],
    },
    editor: {
      isPreviewMode: false,
    },
    users: {
      featureFlag: {
        data: {},
        overriddenFlags: {},
      },
    },
    ide: {
      view: EditorViewMode.FullScreen,
    },
    debugger: {
      context: {
        errorCount: 0,
      },
    },
    apiPane: {
      debugger: {
        open: true,
        responseTabHeight: 200,
        selectedTab: "response",
      },
    },
  },
};

describe("ApiResponseView", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(storeState);
  });

  it("the container should have class select-text to enable the selection of text for user", () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Router>
            <ApiResponseView
              apiName="Api1"
              isRunning={false}
              onRunClick={() => {}}
              responseDataTypes={[]}
              responseDisplayFormat={{ title: "JSON", value: "JSON" }}
            />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    expect(
      container
        .querySelector(".t--api-bottom-pane-container")
        ?.classList.contains("select-text"),
    ).toBe(true);
  });
});
