import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf, deleteInterviewReport } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReport || null
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response?.interviewReport || null
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response?.interviewReports || []
    }

    const getResumePdf = async (interviewReportId) => {
  setLoading(true);

  try {
    const response = await generateResumePdf({ interviewReportId });

    const blob = new Blob([response], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `resume_${interviewReportId}.pdf`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
    alert("Resume PDF download failed");
  } finally {
    setLoading(false);
  }
};

    const deleteReport = async (interviewReportId) => {
        setLoading(true)
        try {
            const response = await deleteInterviewReport({ interviewReportId })
            setReports((currentReports) => currentReports.filter((item) => item._id !== interviewReportId))
            if (report?._id === interviewReportId) {
                setReport(null)
            }
            return response
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf, deleteReport }

}
