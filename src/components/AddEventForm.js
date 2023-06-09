
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import EventService from '../services/EventService';
import utc from 'dayjs/plugin/utc'; // import the UTC plugin

dayjs.extend(utc); // add the UTC plugin to Day.js


const format = 'HH:mm';

const App = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    form.setFieldsValue({
      "title": '',
      "eventDescription": '',
      "location": '',
      "eventDate": '',
      "startTime": '',
      "endTime": '',
    }); 
  };

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      startTime: dayjs.utc(values.startTime).format('HH:mm:ss'),
      endTime: dayjs.utc(values.endTime).format('HH:mm:ss'),
      eventDate: dayjs(values.eventDate).format('YYYY-MM-DD')
    };
    EventService.addEvent(formattedValues)
      .then(response => {
        console.log(response);
        console.log(formattedValues);
        onClose();
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  const [form] = Form.useForm();

  return (
    <>
      <Button onClick={showDrawer} icon={<PlusOutlined />}>
        Add Event
      </Button>
      <Drawer
        title="Add a new event"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={form.submit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter event title' }]}
              >
                <Input placeholder="Please enter event title" />
              </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: 'Please enter a location' }]}
                >
                    <Input placeholder="Please enter a location" />
                </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="eventDate"
                label="Date"
                rules={[{ required: true, message: 'Please choose the date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item
                name="startTime"
                label="start"
                rules={[{ required: true, message: 'Please choose the start time' }]}
              >
                <TimePicker defaultValue={dayjs.utc('00:00', format)} format={format} />
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item
                name="endTime"
                label="end"
                rules={[{ required: true, message: 'Please choose the end time' }]}
              >
                <TimePicker defaultValue={dayjs.utc('00:00', format)} format={format} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="eventDescription"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default App;