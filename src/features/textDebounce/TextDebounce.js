import React, { useState, useEffect } from "react";
import Container from "rsuite/lib/Container";
import Header from "rsuite/lib/Header";
import Content from "rsuite/lib/Content";
import Loader from "rsuite/lib/Loader";
import Input from "rsuite/lib/Input";
import Divider from "rsuite/lib/Divider";
import useDebounceFn from "ahooks/lib/useDebounceFn";
import { useDispatch, useSelector } from "react-redux";
import { selectText, updateStoreText } from "./textDebounceSlice";

const TextDebounce = () => {
  const dispatch = useDispatch();
  const storeText = useSelector(selectText);
  const [textareaValue, setTextareaValue] = useState(storeText);
  const [loadingDispatch, setLoadingDispatch] = useState(false);
  // const debouncedValue = useDebounce(textareaValue, { wait: 500 });

  const debouncedDispatch = useDebounceFn(
    (val) => {
      dispatch(updateStoreText(val));
      setLoadingDispatch(false);
    },
    { wait: 1000 }
  );

  const handleChange = (val) => {
    // update local state
    setTextareaValue(val);
    // Update store
    setLoadingDispatch(true);
    debouncedDispatch.run(val);
  };

  useEffect(() => {
    console.log("storeText changed... " + storeText);
  }, [storeText]);

  return (
    <Container>
      <Header style={{ textAlign: "center" }}>
        <h2>Debounce with large Stores</h2>
      </Header>
      <Content style={{ padding: "2rem" }}>
        <Divider />
        <p>
          Uses{" "}
          <a href="https://github.com/Marak/Faker.js#readme" target="_blank">
            faker.js
          </a>{" "}
          for mock data
        </p>
        <p>
          Uses{" "}
          <a
            href="https://ahooks.js.org/hooks/side-effect/use-debounce-fn"
            target="_blank"
          >
            useDebounceFn from ahooks
          </a>{" "}
          for debounced actions
        </p>

        {loadingDispatch && (
          <Loader
            size="lg"
            speed="fast"
            center
            vertical
            content="Debounced dispatch to store..."
          />
        )}
        <Input
          componentClass="textarea"
          rows={8}
          placeholder="Start typing"
          onChange={handleChange}
          value={textareaValue}
        />
      </Content>
    </Container>
  );
};

export default TextDebounce;
