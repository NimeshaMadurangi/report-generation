<?php

namespace App\Http\Controllers;

use App\Models\Lottery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class LotteryController extends Controller
{
    // Path for storing XML files
    const XML_STORAGE_PATH = 'xml_files';

    // Upload XML files and save lottery data
    public function upload(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'required|file|mimes:xml|max:2048',
        ]);

        $lotteriesData = [];

        foreach ($request->file('files') as $file) {
            try {
                $path = $file->store(self::XML_STORAGE_PATH);
                $xml = @simplexml_load_file(Storage::path($path));

                if ($xml === false) {
                    Log::warning("Invalid XML format in file: {$file->getClientOriginalName()}");
                    continue;
                }

                $data = json_decode(json_encode($xml), true);

                // Validate required data and extract lottery information
                if (!isset($data['number'], $data['name'], $data['date'], $data['balls']['ball'])) {
                    Log::warning("Missing required fields in file: {$file->getClientOriginalName()}");
                    continue;
                }

                $lotteriesData[] = $this->prepareLotteryData($data, $file->getClientOriginalName());
            } catch (\Exception $e) {
                Log::error("Error processing file {$file->getClientOriginalName()}: " . $e->getMessage());
                continue;
            }
        }

        if (!empty($lotteriesData)) {
            Lottery::insert($lotteriesData);
        }

        return redirect()->route('report')->with('success', 'Files uploaded and processed successfully.');
    }

    // Fetch only today's lotteries for the report page
    public function report()
    {
        $today = Carbon::today(); // Get today's date
        $lotteries = Lottery::whereDate('date', $today) // Filter by today's date
                             ->orderBy('date', 'desc')
                             ->get();

        return inertia('Report', ['lotteries' => $lotteries]);
    }

    // Fetch lotteries by name and filter by today's date
    public function fetchByName(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $today = Carbon::today(); // Get today's date
        $lotteries = Lottery::where('name', $request->name)
                             ->whereDate('date', $today) // Filter by today's date
                             ->orderBy('date', 'desc')
                             ->get();

        return response()->json($lotteries);
    }

    // Prepare lottery data for database insertion
    private function prepareLotteryData(array $data, string $fileName)
    {
        $balls = isset($data['balls']['ball']) ? (array) $data['balls']['ball'] : [];
        $nextSuper = isset($data['next']['super']) ? (float) str_replace(',', '', $data['next']['super']) : null;

        // Extract special attributes
        $special1 = $this->extractSpecialValue($data, 'SP_50,000_NO');
        $special2 = $this->extractSpecialValue($data, 'SP_40_NO');
        $special3 = $this->extractSpecialValue($data, 'SP_200_NO');
        $special4 = $this->extractSpecialValue($data, 'SP_100,000_NO');

        // Extract total value from the <total> tag
        $totalValue = isset($data['total']) ? (float) str_replace(',', '', $data['total']) : null;

        // Extract prize data
        $prizeData = $this->extractPrizeData($data);

        return [
            'name' => $data['name'] ?? 'LAGNA WASANAWA',
            'number' => $data['number'],
            'date' => isset($data['date']) ? Carbon::parse($data['date'])->toDateTimeString() : null,
            'color' => $data['color'] ?? null,
            'next_date' => isset($data['next']['date']) ? Carbon::parse($data['next']['date'])->toDateTimeString() : null,
            'next_super' => number_format($nextSuper * 0.91, 2, '.', ''),
            'ball1' => $balls[0] ?? null,
            'ball2' => $balls[1] ?? null,
            'ball3' => $balls[2] ?? null,
            'ball4' => $balls[3] ?? null,
            'ball5' => $balls[4] ?? null,
            'ball6' => $balls[5] ?? null,
            'ball7' => $balls[6] ?? null,
            'special1' => $special1,
            'special2' => $special2,
            'special3' => $special3,
            'special4' => $special4,
            'total' => $totalValue,  // The extracted total value
            'count' => $prizeData['winner_count'], // Winner count for 200000.00 prize
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    // Extract specific prize data (total value and winner count) for the 200000.00 prize
    private function extractPrizeData(array $data)
    {
        $totalValue = 0;
        $winnerCount = 0;

        if (isset($data['results']['prize'])) {
            foreach ($data['results']['prize'] as $prize) {
                if ((float) $prize['value'] == 200000.00) {
                    $totalValue = (float) $prize['value'];
                    $winnerCount = (int) $prize['count'];
                    break; // Only process the first matching prize
                }
            }
        }

        return [
            'total_value' => $totalValue,
            'winner_count' => $winnerCount,
        ];
    }

    // Extract a specific special value from the attributes
    private function extractSpecialValue(array $data, string $key)
    {
        if (isset($data['attributes']['attribute'])) {
            foreach ($data['attributes']['attribute'] as $attribute) {
                if (isset($attribute['key']) && $attribute['key'] === $key) {
                    return $attribute['valueen'] ?? null;
                }
            }
        }

        return null;
    }

    // Fetch the latest lottery by name
    public function getLottery(Request $request)
    {
        $lottery = Lottery::where('name', $request->name)
                          ->whereDate('date', Carbon::today()) // Filter by today's date
                          ->latest()
                          ->first();

        if (!$lottery) {
            return response()->json(['message' => 'Lottery not found'], 404);
        }

        return response()->json($lottery);
    }
}
