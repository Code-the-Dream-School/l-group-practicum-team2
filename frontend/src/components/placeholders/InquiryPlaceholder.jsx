import {Row, Col, Placeholder, Card} from 'react-bootstrap';

const InquiryPlaceholder = () => {
    const createItemArr = (count) => Array.from({ length: count }, (_, i) => i + 1);
    const itemArr = createItemArr(3);

    return(
        <>
        {itemArr.map((item)=>(
            <div key={item} >
                
                    <Card className='w-100 rounded-4 overflow-hidden mb-3'>
                        <Row>
                            <Col xs={3} className=''>
                                <Placeholder
                                    as="div"
                                    animation="glow"
                                    className="w-100 rounded "
                                    style={{ aspectRatio: "1 / 1" }}
                                >
                                    <Placeholder xs={12} className="h-100 w-100" />
                                </Placeholder>
                            </Col>
                            <Col className='p-3'>
                            <Placeholder as="h3" animation="wave" className='mb-5'>
                                <Placeholder xs={4} />
                            </Placeholder>
                            <Placeholder as="p" animation="wave" className=''>
                                <Placeholder xs={12} />
                                <Placeholder xs={12} />
                                <Placeholder xs={12} />
                            </Placeholder>
                            </Col>
                        </Row>
                    </Card>
               
                

            </div>
        ))}
        </>
    )
    
}
export default InquiryPlaceholder