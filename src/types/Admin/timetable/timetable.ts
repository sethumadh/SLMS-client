import { z } from "zod";

const RoomSchema = z.object({
  teacherName: z.string(),
  subjectName: z.string(),
}).refine((data) => {
  const isTeacherNameProvided = data.teacherName.trim() !== "";
  const isSubjectNameProvided = data.subjectName.trim() !== "";

  return (isTeacherNameProvided && isSubjectNameProvided) || (!isTeacherNameProvided && !isSubjectNameProvided);
}, {
  message: "Both teacher and subject is required",
});

const TimeslotSchema = z.object({
  name: z.string(),
  rooms: z.array(RoomSchema),
}).refine((data) => {
  const teacherNames = data.rooms.map((room) => room.teacherName).filter((name) => name.trim() !== "");
  return new Set(teacherNames).size === teacherNames.length;
}, {
  message: "Each teacher name must be unique within a timeslot",
  path: ["rooms"],
});

export const timetableSchema = z.object({
  timetable: z.array(TimeslotSchema),
});
export type TimetableSchema = z.infer<typeof timetableSchema>;
