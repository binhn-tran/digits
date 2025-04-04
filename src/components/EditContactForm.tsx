/* eslint-disable import/extensions */

'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Contact } from '@prisma/client';
import { editContact } from '@/lib/dbActions';
import { EditContactSchema } from '@/lib/validationSchemas';

const EditContactForm = ({ contact }: { contact: Contact }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(EditContactSchema),
    defaultValues: contact, // Automatically set default values
  });

  const onSubmit = async (data: Contact) => {
    try {
      console.log('Form data:', data); // Debugging: Log form data
      await editContact(data); // Call the editContact function
      swal('Success', 'Your contact has been updated', 'success', {
        timer: 2000,
      });
    } catch (error) {
      console.error('Error updating contact:', error); // Debugging: Log errors
      swal('Error', 'Failed to update contact', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Contact</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Hidden owner field */}
                <input type="hidden" {...register('owner')} value={contact.owner} />

                {/* First Name */}
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </Form.Group>

                {/* Last Name */}
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                </Form.Group>

                {/* Address */}
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <input
                    type="text"
                    {...register('address')}
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.address?.message}</div>
                </Form.Group>

                {/* Image */}
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="text"
                    {...register('image')}
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.image?.message}</div>
                </Form.Group>

                {/* Description */}
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                {/* Submit and Reset Buttons */}
                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditContactForm;
