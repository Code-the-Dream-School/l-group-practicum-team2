import {Placeholder, Row, Col, Button} from 'react-bootstrap';

const ProfileSketleton = () => {

    return (
        <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
            <Row className="mb-5">
                <Col>
                    <Placeholder as="h2" animation="wave" className="mb-2">
                        <Placeholder xs={2} />
                    </Placeholder>
                    
                    <Placeholder xs={6} />
                </Col>
            </Row>
            
            {[1, 2, 3].map((item) => (
                <div key={item} className="mb-3">
                    <Row>
                        <Col xs={8}>
                            <Placeholder as="h5" animation="wave" className="mb-2">
                                <Placeholder xs={2} />
                            </Placeholder>

                            <Placeholder as="p" animation="wave">
                                <Placeholder xs={6} />
                            </Placeholder>
                        </Col>

                        <Col xs={4} className="text-end">
                            <Placeholder.Button variant="primary" xs={4} />
                        </Col>
                    </Row>
                </div>
            ))}
        </main>

    )
}
export default ProfileSketleton