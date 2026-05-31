import { Row, Col, Placeholder, Card } from "react-bootstrap";

const AnimalPlaceholder = () => {
  const createItemArr = (count) =>
    Array.from({ length: count }, (_, i) => i + 1);
  const itemArr = createItemArr(4);
  return (
    <Card className="w-100 rounded-4 overflow-hidden mb-3">
      <Row>
        <Col xs={6} className="">
          <Placeholder
            as="div"
            animation="glow"
            className="w-100 rounded "
            style={{ aspectRatio: "1 / 1" }}
          >
            <Placeholder xs={12} className="h-100 w-100" />
          </Placeholder>
        </Col>
        <Col className="p-3">
          <Placeholder as="h3" animation="wave" className="mb-5">
            <Placeholder xs={4} />
          </Placeholder>
          {itemArr.map((item) => (
            <div key={item}>
              <Card className="w-100 rounded-4 overflow-hidden mb-3">
                <Placeholder as="h4" animation="wave" className="mb-3">
                  <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as="p" animation="wave" className="">
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                </Placeholder>
              </Card>
            </div>
          ))}

          <Row>
            <Col xs={3}>
              <Placeholder.Button variant="secondary" xs={12} />
            </Col>
            <Col xs={3}>
              <Placeholder.Button variant="primary" xs={12} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
export default AnimalPlaceholder;
