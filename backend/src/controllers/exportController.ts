import { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import exportService from '../services/exportService'

export const exportPDF = asyncHandler(async (req,res) => {
    const buffer = await exportService.toPDF(req.params.scheduleId)
    res.setHeader('Content-Type','application/pdf')
    res.send(buffer)
})

export const exportExcel = asyncHandler(async (req,res) => {
    const buffer = await exportService.toExcel(req.params.scheduleId)
    res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.send(buffer)
})

export const exportJSON = asyncHandler(async (req,res) => {
    const data = await exportService.toJSON(req.params.scheduleId)
    res.json({ status:'success', data })
})

export const exportImage = asyncHandler(async (req,res) => {
    const buffer = await exportService.toImage(req.params.scheduleId)
    res.setHeader('Content-Type','image/png')
    res.send(buffer)
})
