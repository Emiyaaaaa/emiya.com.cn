// random id, length 8
export default function rid() {
  return Math.random().toString(36).substr(2, 8)
}
