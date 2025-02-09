import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());



const students: { [key: string]: { name: string; points: number } } = {
  "65041785": { name: "Phattarapong Phengtavee", points: 1000 },
};

function calculatePoints(amount : number) {
  return Math.floor(amount / 100) * 10;
}

app.post('/accumulate-points', async (req, res) => {
  try {
    const { studentId, amount } = req.body;

    if (!studentId || !amount) {
      return res.status(400).json({ message: 'ระบุรหัสนักศึกษาและจำนวนเงิน' });
    }

    if (!students[studentId]) {
      return res.status(404).json({ message: 'ไม่พบนักศึกษาที่มีรหัสดังกล่าวในระบบ' });
    }

    const pointsToAdd = calculatePoints(amount);
    students[studentId].points += pointsToAdd;

    return res.status(200).json({
      message: 'อัพเดทคะแนนสะสมสำเร็จ!',
      studentId: studentId,
      pointsReceived: pointsToAdd,
      totalPoints: students[studentId].points,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
