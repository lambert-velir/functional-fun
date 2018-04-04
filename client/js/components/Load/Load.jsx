import React from "react";
import R from "ramda";
import { arrayOf, func, shape, string } from "prop-types";
import Modal from "../Modal/Modal.jsx";
import { Controlled as CodeMirror } from "react-codemirror2";

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default class Load extends React.Component {

  static propTypes = {
    examples: arrayOf(shape({
      displayName: string.isRequired,
      slug: string.isRequired,
      code: string.isRequired
    })).isRequired,
    onChange: func.isRequired
  };

  state = {
    isOpen: false
  }

  open = (e) => this.setState({ isOpen: true })

  close = (e) => this.setState({ isOpen: false })

  handleExampleClick = (slug) => (event) => {

    // don't do anythning if the user is holding down cmd/ctrl (to open in a new tab)
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js#L35-L55
    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      this.props.onChange(slug);
      this.close();
    }
  }

  renderExample = example => {

    const { displayName, slug, code } = example;

    return (
      <div key={slug} className="example__holder">
        <a href={`#${slug}`} className="example"
          onClick={this.handleExampleClick(slug)}
        >
          <div className="example__name">{displayName}</div>
          <div className="example__preview">
            <CodeMirror
              mode="javascript"
              value={code}
              options={{
                mode: "javascript",
                readOnly: true,
                theme: "github",
                lineWrapping: false
              }}
            />
          </div>
        </a>
      </div>
    );
  }

  render = () => {
    const { examples } = this.props;
    const { isOpen } = this.state;

    const exampleMap = R.indexBy(R.prop("slug"), examples);

    const exampleSections = [
      {
        title: "Core functional tools",
        examples: ["map", "filter", "find", "reduce"]
      },
      {
        title: "Currying / Partial application",
        examples: [ "max", "numbers"]
      },
      {
        title: "Composition",
        examples: ["debugging", "sentences", "average-strength", "sum-of-stats", "slow-heroes", "hero-names-by-gender"]
      }
    ];

    return (
      <div className="load">
        <button type="button" onClick={this.open}>Load challenge</button>

        <Modal isOpen={isOpen} onClose={this.close} className="modal--examples">
          <div className="examples">
            {
              exampleSections.map(({ title, examples }) => (
                <div key={title} className="examples__section">
                  <div className="examples__section-title">{title}</div>
                  <div className="examples__buttons">
                    {examples.map(slug => this.renderExample(exampleMap[slug]))}
                  </div>
                </div>
              ))
            }
          </div>
        </Modal>
      </div>
    );
  };
}
