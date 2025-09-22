// backend/src/services/exportService.ts

import Schedule from '../models/Schedule'
import PDFDocument from 'pdfkit'
import ExcelJS from 'exceljs'

export default {
    /**
     * Generates a PDF buffer for the given schedule.
     */
    async toPDF(scheduleId: string): Promise<Buffer> {
        const sched = await Schedule.findById(scheduleId).lean()
        if (!sched) {
            throw new Error('Schedule not found')
        }

        const doc = new PDFDocument()
        const buffers: Buffer[] = []
        doc.on('data', (chunk: Buffer) => buffers.push(chunk))
        doc.text(`Schedule: ${sched.name}`, { underline: true })
        sched.courses.forEach((c) => {
            doc.moveDown().text(
                `${c.code} — ${c.name} (${c.credits} credits) by ${c.instructor}`
            )
        })
        doc.end()

        return Buffer.concat(buffers)
    },

    /**
     * Generates an Excel buffer for the given schedule.
     */
    async toExcel(scheduleId: string): Promise<Buffer> {
        const sched = await Schedule.findById(scheduleId).lean()
        if (!sched) {
            throw new Error('Schedule not found')
        }

        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet('Schedule')
        sheet.addRow(['Code', 'Name', 'Instructor', 'Credits'])
        sched.courses.forEach((c) => {
            sheet.addRow([c.code, c.name, c.instructor, c.credits])
        })

        // Generate ArrayBuffer and convert to Buffer
        const arrayBuffer = await workbook.xlsx.writeBuffer()
        return Buffer.from(arrayBuffer)
    },

    /**
     * Returns JSON representation of the schedule.
     */
    async toJSON(scheduleId: string) {
        const sched = await Schedule.findById(scheduleId)
        if (!sched) {
            throw new Error('Schedule not found')
        }
        return sched
    },

    /**
     * Stub for image export.
     */
    async toImage(_scheduleId: string): Promise<Buffer> {
        return Buffer.alloc(0)
    }
}
