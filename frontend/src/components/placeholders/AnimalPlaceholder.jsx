import { Row, Col, Placeholder, Card } from "react-bootstrap";

const AnimalPlaceholder = () => {
  
  return (
    <Card className="w-100 rounded-4 overflow-hidden mb-3">
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Placeholder
            as="div"
            animation="glow"
            className="w-100 rounded "
            style={{ aspectRatio: "1 / 1" }}
          >
            <Placeholder xs={12} className="h-100 w-100" />
          </Placeholder>
        </Col>
        <Col xs={12} md={6} className="mb-3 pe-5">
          <Placeholder as="h3" animation="wave" className="mb-5 mt-2">
            <Placeholder xs={4} />
          </Placeholder>
          <Row>
            {Array.from({ length: 4 }).map((_, index) => (
              <Col key={index} xs={6}>
                <Card className="w-100 rounded-4 overflow-hidden mb-3 p-3 pb-5" >
                  <Placeholder as="h5" animation="wave" className="mb-5">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder xs={12} />
                </Card>
              </Col>
            ))}
            
            
          </Row>
          <Row>
         {Array.from({ length: 3 }).map((_, index) => (
            <Col key={index} xs={12}>
              <Card className="w-100 rounded-4 overflow-hidden mb-3 p-4">
                <Placeholder as="h4" animation="wave" className="mb-3">
                  <Placeholder xs={4} />
                </Placeholder>
                <Placeholder as="p" animation="wave" className="">
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                </Placeholder>
              </Card>
            </Col>
          ))}
          </Row>

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
