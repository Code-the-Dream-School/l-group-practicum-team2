import {Row, Col, Placeholder, Card} from 'react-bootstrap';

const AnimalListPlaceHolder = () => {
    const createItemArr = (count) => Array.from({ length: count }, (_, i) => i + 1);
    const itemArr = createItemArr(12);

    return(
        <Row>
            {itemArr.map((item)=>(
                <Col key={item} xs={12} md={4} lg={3} className='mb-3'>
                    <Card className='rounded-4 overflow-hidden'>
                        <Placeholder
                            as="div"
                            animation="glow"
                            className="w-100 rounded mb-2 "
                            style={{ aspectRatio: "1 / 1" }}
                        >
                            <Placeholder xs={12} className="h-100 w-100" />
                        </Placeholder>
                        <Placeholder as="p" animation="wave" className='mx-3'>
                            <Placeholder xs={12} />
                            <Placeholder xs={12} />
                            <Placeholder xs={12} />
                        </Placeholder>
                    </Card>
                </Col>
            ))}

        </Row>
    )
    
}
export default AnimalListPlaceHolder