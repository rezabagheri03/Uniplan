// src/routes/schedulesAndCourses.test.ts
import request from 'supertest'
import app from '../app'

let token: string

beforeEach(async () => {
    const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'FlowTest', email: 'flow@test.com', password: 'flowpass' })
    token = res.body.token
})

describe('Schedule & Course Endpoints', () => {
    it('creates a schedule and lists it', async () => {
        const createRes = await request(app)
            .post('/api/schedules')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Fall2025', semester: 'پاییز', year: 1404 })
            .expect(201)
        expect(createRes.body.data.schedule).toHaveProperty('_id')

        const listRes = await request(app)
            .get('/api/schedules')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(listRes.body.data.schedules).toHaveLength(1)
        expect(listRes.body.data.schedules[0].name).toBe('Fall2025')
    })

    it('adds, updates, and retrieves a course', async () => {
        const { body: { data: { schedule } } } = await request(app)
            .post('/api/schedules')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'TestSched', semester: 'پاییز', year: 1404 })

        const courseRes = await request(app)
            .post('/api/courses')
            .set('Authorization', `Bearer ${token}`)
            .send({
                scheduleId: schedule._id,
                code: 'CS999',
                name: 'Test Course',
                instructor: 'Dr. Test',
                credits: 4,
                timeSlots: [{ day: 'شنبه', startTime: '10:00', endTime: '12:00', type: 'Lecture' }],
                color: '#000000'
            })
            .expect(201)
        expect(courseRes.body.data.schedule.courses).toHaveLength(1)

        const courseId = courseRes.body.data.schedule.courses[0]._id
        await request(app)
            .patch(`/api/courses/${courseId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Course' })
            .expect(200)

        const getRes = await request(app)
            .get('/api/courses')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(getRes.body.data.courses[0].name).toBe('Updated Course')
    })

    it('deletes a course', async () => {
        const { body: { data: { schedule } } } = await request(app)
            .post('/api/schedules')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'DeleteSched', semester: 'پاییز', year: 1404 })

        const { body: { data: { schedule: schedWithCourse } } } = await request(app)
            .post('/api/courses')
            .set('Authorization', `Bearer ${token}`)
            .send({
                scheduleId: schedule._id,
                code: 'CS100',
                name: 'ToDelete',
                instructor: 'Dr. X',
                credits: 2,
                timeSlots: [{ day: 'یکشنبه', startTime: '08:00', endTime: '10:00', type: 'Lecture' }],
                color: '#123456'
            })

        const courseId = schedWithCourse.courses[0]._id
        await request(app)
            .delete(`/api/courses/${courseId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const afterRes = await request(app)
            .get('/api/courses')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(afterRes.body.data.courses).toHaveLength(0)
    })
})
