export default function handler(req, res) {
    console.log("Called apis")
    res.status(200).json({ name: 'John Doe' })
  }
  